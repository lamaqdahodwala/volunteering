import { DateTime, Interval } from 'luxon'
import type {
  MutationResolvers,
  QueryResolvers,
  SignupRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { ForbiddenError, RedwoodGraphQLError } from '@redwoodjs/graphql-server'

export const signups: QueryResolvers['signups'] = () => {
  return db.signup.findMany()
}

export const checkForConflicts: QueryResolvers['checkForConflicts'] = async ({
  job_id,
}) => {
  let user_id = context.currentUser.id

  let job = await db.job.findUnique({
    where: {
      id: job_id,
    },
  })

  let signups = await db.signup.findMany({
    where: {
      for_user: {
        id: user_id,
      },
      on_job: {
        datetime: {
          gt: new Date(),
        },
      },
    },
    include: {
      on_job: true,
    },
  })

  let job_start_times = signups.map((signup) =>
    DateTime.fromJSDate(signup.on_job.datetime)
  )

  let job_end_times = []
  for (let index = 0; index < signups.length; index++) {
    const signup = signups[index]
    const start_time = job_start_times[index]
    job_end_times.push(start_time.plus({ hours: signup.on_job.duration }))
  }

  // Create the intervals of each job's time
  let time_intervals: Interval[] = []
  for (let index = 0; index < job_start_times.length; index++) {
    const start_time = job_start_times[index]
    const end_time = job_end_times[index]

    let interval = Interval.fromDateTimes(start_time, end_time)

    time_intervals.push(interval)
  }

  let specified_job_start_time = DateTime.fromJSDate(job.datetime)
  let specified_job_end_time = specified_job_start_time.plus({
    hours: job.duration,
  })
  let specified_job_interval = Interval.fromDateTimes(
    specified_job_start_time,
    specified_job_end_time
  )


  let conflicts = false
  time_intervals.forEach((interval) => {
    if (conflicts) return

    if ( interval.overlaps(specified_job_interval) ) {
      conflicts = true
    }
  })

  return conflicts
}


export const amISignedUpFor: QueryResolvers['amISignedUpFor'] = async ({
  job_id,
}) => {
  let user_id = context.currentUser.id
  let job = await db.job.findUnique({
    where: {
      id: job_id,
    },
    include: {
      signups: {
        include: {
          for_user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  })

  let signed_up_user_ids = job.signups.map((val) => val.for_user.id)
  if (signed_up_user_ids.includes(user_id)) return true
  return false
}
export const signupForJob: MutationResolvers['signupForJob'] = async ({
  job_id,
}) => {
  let job = await db.job.findUniqueOrThrow({
    where: {
      id: job_id,
    },
    include: {
      _count: {
        select: {
          signups: true,
        },
      },
    },
  })

  if (job._count.signups + 1 > job.max_signups) {
    return null
  }
  return db.signup.create({
    data: {
      for_user: {
        connect: {
          id: context.currentUser.id,
        },
      },
      on_job: {
        connect: {
          id: job_id,
        },
      },
    },
  })
}

export const viewUpcomingJobs: QueryResolvers['viewUpcomingJobs'] = () => {
  const user_id = context.currentUser.id
  return db.signup.findMany({
    where: {
      for_user: {
        id: user_id,
      },
      on_job: {
        datetime: {
          gt: new Date(Date.now()),
        },
      },
    },
  })
}

export const viewVolunteerLog: QueryResolvers['viewVolunteerLog'] = () => {
  let user_id = context.currentUser.id
  return db.signup.findMany({
    where: {
      for_user: {
        id: user_id,
      },
      completed: true,
    },
  })
}

export const checkIntoJob: MutationResolvers['checkIntoJob'] = async ({
  job_id,
  user_id,
  secret_phrase,
}) => {
  let job = await db.job.findUnique({
    where: {
      id: job_id,
    },
    include: {
      signups: {
        include: {
          for_user: true,
        },
      },
    },
  })

  let signed_up_user_ids = job.signups.map((val) => val.id)

  if (!signed_up_user_ids.includes(user_id)) {
    throw new ForbiddenError('This user has not signed up for this job')
  }

  let user_index = signed_up_user_ids.indexOf(user_id)
  let signup_for_user = job.signups[user_index]
  let user = signup_for_user.for_user

  if (user.secret_phrase !== secret_phrase) {
    throw new ForbiddenError('Wrong phrase')
  }

  return await db.signup.update({
    where: {
      id: signup_for_user.id,
    },
    data: {
      completed: true,
    },
  })
}
export const removeSignupForJob: MutationResolvers['removeSignupForJob'] =
  async ({ job_id }) => {
    let user_id = context.currentUser.id

    let job_signups = await db.signup.findMany({
      where: {
        on_job: {
          id: job_id,
        },
        for_user: {
          id: user_id,
        },
      },
    })

    if (job_signups.length !== 1) {
      throw new RedwoodGraphQLError('What the flip did you do')
    }

    let signup = job_signups[0]

    return db.signup.delete({
      where: {
        id: signup.id,
      },
    })
  }
export const Signup: SignupRelationResolvers = {
  on_job: (_obj, { root }) => {
    return db.signup.findUnique({ where: { id: root?.id } }).on_job()
  },
  for_user: (_obj, { root }) => {
    return db.signup.findUnique({ where: { id: root?.id } }).for_user()
  },
}
