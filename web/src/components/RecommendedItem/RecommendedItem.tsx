import { FC } from "react"

interface RecommendedItemProps {
  title: string,
  manager: {
    username: string
  },
  max_signups: number,
  id: number,
  description: string
}
const RecommendedItem: FC<RecommendedItemProps> = (props) => {
  return (
    <div className="bg-base-300 rounded-lg collapse">
      <input type="checkbox"/>
      <p className="text-2xl font-bold collapse-title">{props.title}</p>
      <div className="collapse-content">
        <div className="grid grid-cols-3 gap-3">

        <div>
          <p>{props.description}</p>
        </div>
        <div>
          <h1>Quick stats</h1>
        </div>
        <div className="grid place-items-center">

          <button className="btn btn-success btn-outline w-full">Sign up</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendedItem
