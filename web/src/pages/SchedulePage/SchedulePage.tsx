import ScheduleCell from 'src/components/ScheduleCell/ScheduleCell'
import { MetaTags } from '@redwoodjs/web'

const SchedulePage = () => {
  return (
    <>
      <MetaTags title="Schedule" description="Schedule page" />

      <ScheduleCell></ScheduleCell>
    </>
  )
}

export default SchedulePage
