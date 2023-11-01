import { FC } from 'react'
import Tag from '../Tag/Tag'

interface RecommendedItemProps {
  title: string
  manager: {
    username: string
  }
  max_signups: number
  id: number
  description: string
  tags: {
    description: string,
    id: number,
    name: string
  }[]
}
const RecommendedItem: FC<RecommendedItemProps> = (props) => {
  return (
    <div className="collapse rounded-lg bg-base-300">
      <input type="checkbox" />
      <div className="collapse-title flex flex-row justify-between">
        <p className="text-2xl font-bold">{props.title}</p>
        <div className=" flex flex-row gap-3">
          {props.tags.map((val, index) => <Tag {...val} key={index}></Tag>)}
        </div>
        <p>Click for more info</p>
      </div>
      <div className="collapse-content">
        <div className="flex w-full flex-row">
          <div className="flex-grow">
            <p className="font-bold">Summary</p>
            <p className="w-96">{props.description}</p>
          </div>
          <p className="divider divider-horizontal"></p>
          <div className="flex-grow">
            <h1 className="font-bold">Quick stats</h1>
            <p>{props.max_signups} spots in total</p>
          </div>
          <p className="divider divider-horizontal"></p>
          <div className="grid flex-grow place-items-center">
            <a
              href={`/job/${props.id}`}
              className="btn btn-success btn-outline w-full"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecommendedItem
