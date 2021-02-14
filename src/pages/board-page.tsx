import { range } from 'lodash'
import { useParams } from 'react-router-dom'
import { useBoard, useBoardStyle } from '../query-hooks/board-hooks'
import { Form, TextInput } from '../shared/components/form'
import { QueryContainer } from '../shared/components/query-container'

const BoardPage = () => {
  const { id } = useParams<{ id: string }>()
  const boardQuery = useBoard(id)
  const style = useBoardStyle(boardQuery.data, 'lg')

  return (
    <QueryContainer query={boardQuery}>
      <div className="h-screen relative overflow-hidden" style={style}>
        <div className="h-8 bg-blue-500 bg-opacity-50"></div>
        <div className="flex">
          <div className="px-2">
            <h1 className="text-2xl uppercase font-bold">
              {boardQuery.data?.name}
            </h1>
            <div className="flex">
              {range(0, 15).map(i => (
                <div
                  key={i}
                  className="w-56 p-3 mr-2 rounded bg-gray-200 text-black"
                >
                  <h3 className="font-bold text-gray-800 mb-2">List</h3>
                  <ul>
                    <li>
                      <Form initialValues={{ test: '' }} onSubmit={console.log}>
                        <TextInput name="test" />
                      </Form>
                    </li>
                    <li>
                      <Form initialValues={{ test: '' }} onSubmit={console.log}>
                        <TextInput name="test" />
                      </Form>
                    </li>
                    <li>
                      <Form initialValues={{ test: '' }} onSubmit={console.log}>
                        <TextInput name="test" />
                      </Form>
                    </li>
                    <li>
                      <Form initialValues={{ test: '' }} onSubmit={console.log}>
                        <TextInput name="test" />
                      </Form>
                    </li>
                    <li>
                      <Form initialValues={{ test: '' }} onSubmit={console.log}>
                        <TextInput name="test" />
                      </Form>
                    </li>
                    <li>
                      <Form initialValues={{ test: '' }} onSubmit={console.log}>
                        <TextInput name="test" />
                      </Form>
                    </li>
                    <li>
                      <Form initialValues={{ asd: '' }} onSubmit={console.log}>
                        <TextInput name="asd" />
                      </Form>
                    </li>
                    <li>
                      <Form initialValues={{ asd: '' }} onSubmit={console.log}>
                        <TextInput name="asd" />
                      </Form>
                    </li>
                    <li>
                      <Form initialValues={{ asd: '' }} onSubmit={console.log}>
                        <TextInput name="asd" />
                      </Form>
                    </li>
                    <li>
                      <Form initialValues={{ asd: '' }} onSubmit={console.log}>
                        <TextInput name="asd" />
                      </Form>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute right-0 h-full w-96 rounded bg-gray-200 text-black">
            {/* <div className="h-8">
              <div
                className={`grid grid-flow-col auto-cols-fr h-full border-t text-center`}
              >
                <div className={`border-r ${actionContainerClassName}`}>
                  <PencilIcon />
                </div>
                <div className={`${actionContainerClassName}`}>
                  <TrashIcon />
                </div>
              </div> */}
          </div>
        </div>
      </div>
    </QueryContainer>
  )
}

export default BoardPage
