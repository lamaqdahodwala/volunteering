import { DateTime, Interval } from 'luxon'

import type {
  FindSchedulerQuery,
  FindSchedulerQueryVariables,
} from 'types/graphql'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { useEffect } from 'react'
import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query FindSchedulerQuery($job_id: Int!) {
    scheduler: viewUpcomingJobs {
      id
      on_job {
        datetime
        title
        duration
        manager {
          username
        }
      }
    }
    amISignedUpFor(job_id: $job_id)
    job: jobDetail(id: $job_id) {
      id
      datetime
      title
      description
      duration
      manager {
        username
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSchedulerQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const beforeQuery = (props) => {
  return {
    variables: {
      job_id: Number(props.job_id),
    },
  }
}

const SIGN_UP_MUTATION = gql`
  mutation SignUpForJobMutation($id: Int!) {
    signupForJob(job_id: $id) {
      id
      on_job {
        title
      }
    }
  }
`

const UNSIGN_UP_MUTATION = gql`
  mutation UnSigupUpForJobMutation($id: Int!) {
    removeSignupForJob(job_id: $id) {
      id
    }
  }
`

export const Success = ({
  scheduler,
  amISignedUpFor,
  job,
}: CellSuccessProps<FindSchedulerQuery, FindSchedulerQueryVariables>) => {
  let isThereTime = checkForConflictsWithPreviousOrNextJobsAndCheckBreak()

  let [signupFunction] = useMutation(SIGN_UP_MUTATION, {
    refetchQueries: [QUERY],
  })
  let [unsignupFunction] = useMutation(UNSIGN_UP_MUTATION, {
    refetchQueries: [QUERY],
  })
  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <h1 className="card-title">Scheduler</h1>

        {!amISignedUpFor ? <p>{isThereTime ? 'There is enough time' : 'Not enough time'}</p> : <p>You are signed up</p> }
        {amISignedUpFor ? (
          <div><button
            className="btn btn-error  flex-grow"
            onClick={() => unsignupFunction({ variables: { id: job.id } })}
          >
            Remove signup
          </button>
          <p><Link to={routes.schedule()}></Link></p>
          </div>
        ) : (
          <button
            className="btn btn-success  flex-grow"
            onClick={() => signupFunction({ variables: { id: job.id } })}
          >
            Sign up
          </button>
        )}
      </div>
    </div>
  )

  function checkForConflictsWithPreviousOrNextJobsAndCheckBreak() {
    let isThereTime: boolean = true

    let upcoming_jobs: Array<any> = scheduler.map((val) => val.on_job)
    upcoming_jobs.push(job)

    upcoming_jobs.sort((a, b) => {
      if (a < b) {
        return -1
      }
      if (a > b) {
        return 1
      }
      return 0
    })

    let index_of_this_job = upcoming_jobs.indexOf(job)
    let comes_before = upcoming_jobs.slice(0, index_of_this_job)
    let comes_after = upcoming_jobs.slice(index_of_this_job + 1)

    let this_job_start_time = DateTime.fromISO(job.datetime)
    let this_job_end_time = this_job_start_time.plus({ hours: job.duration })

    comes_before.forEach((val) => {
      let start_time = DateTime.fromISO(val.datetime)
      let end_time = DateTime.fromISO(val.datetime).plus({
        hours: val.duration,
      })
      let interval = Interval.fromDateTimes(start_time, end_time)

      if (!interval.contains(this_job_start_time)) {
        isThereTime = false
        return
      }

      let diff = end_time.diff(this_job_start_time, ['hours']).toObject()
      if (diff.hours <= 1) {
        isThereTime = false
        return
      }
    })

    if (isThereTime) return isThereTime

    comes_after.forEach((val) => {
      let start_time = DateTime.fromISO(val.datetime)
      let end_time = DateTime.fromISO(val.datetime).plus({
        hours: val.duration,
      })
      let interval = Interval.fromDateTimes(start_time, end_time)

      if (!interval.contains(this_job_end_time)) {
        isThereTime = false
        return
      }
    })
    return isThereTime
  }
}
