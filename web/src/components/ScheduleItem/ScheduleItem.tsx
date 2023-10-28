import { FC } from "react"

interface ScheduleItemProps {
  on_job: {
    title: string,
    datetime: Date,
    manager: {
      username: string
    }
  }
}
const ScheduleItem: FC<ScheduleItemProps> = (props) => {
  return (
    <>
      <div className="card">
        <div className="card-title">{ props.on_job.title }</div>
        <div className="card-body">
          { props.on_job.datetime.toString() }
        </div>
      </div>
    </>
  )
}

export default ScheduleItem
