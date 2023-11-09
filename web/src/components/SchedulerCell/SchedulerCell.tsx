import { DateTime, Interval } from 'luxon'

import type {
  FindSchedulerQuery,
  FindSchedulerQueryVariables,
} from 'types/graphql'
import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
  useQuery,
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

const CHECK_FOR_CONFLICTS = gql`
  query CheckForConflicts($id: Int!) {
    checkForConflicts(job_id: $id)
  }
`

export const Success = ({
  scheduler,
  amISignedUpFor,
  job,
}: CellSuccessProps<FindSchedulerQuery, FindSchedulerQueryVariables>) => {
  const conflicts = useQuery(CHECK_FOR_CONFLICTS, {
    variables: {
      id: job.id,
    },
  })

  let [signupFunction] = useMutation(SIGN_UP_MUTATION, {
    refetchQueries: [QUERY, CHECK_FOR_CONFLICTS],
  })
  let [unsignupFunction] = useMutation(UNSIGN_UP_MUTATION, {
    refetchQueries: [QUERY, CHECK_FOR_CONFLICTS],
  })
  return (
    <div className="card bg-base-300">
      <div className="card-body">
        <h1 className="card-title">Scheduler</h1>

        {conflicts.loading && <div>Fetching results...</div>}
        {conflicts.error && (
          <p>
            Error: <span className="text-error">{String(conflicts.error)}</span>
          </p>
        )}
        {conflicts.data && (
          <div>
            {amISignedUpFor ? (
              <div>
                <button
                  className="btn btn-error btn-outline"
                  onClick={() =>
                    unsignupFunction({
                      variables: {
                        id: job.id,
                      },
                    })
                  }
                >
                  Remove signup
                </button>
                <p>
                  <Link to={routes.schedule()} className="link">
                    View in schedule
                  </Link>
                </p>
              </div>
            ) : (
              <div>
                {conflicts.data.checkForConflicts === true ? (
                  <div>
                    <p className="text-error">There are conflicts!</p>
                    <p>
                      <Link to={routes.schedule()} className="link">
                        Check schedule
                      </Link>
                    </p>
                  </div>
                ) : (
                  <p className="text-success">No conflicts.</p>
                )}
                <button
                  className="btn btn-success btn-outline"
                  disabled={conflicts.data.checkForConflicts}
                  onClick={() =>
                    signupFunction({
                      variables: {
                        id: job.id,
                      },
                    })
                  }
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
