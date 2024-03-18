import React from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { api } from '@/utils/api';
import { testRecordKeys } from '@/utils/helper';

const TestRecord: React.FC = () => {
  const utils = api.useUtils();

  const fetchAll = api.testRecord.getAll.useQuery();

  const addData = api.testRecord.addData.useMutation({
    onSuccess(input) {
      utils.testRecord.getAll.invalidate();
    },
  });

  const resetAll = api.testRecord.deleteAll.useMutation({
    async onSuccess(input) {
      await addData.mutate(2);
      await utils.testRecord.getAll.invalidate();
    },
  });
  return (
    <Layout>
      <div className="page ">
        <div className="flex">
          <h1>List of records ({fetchAll.data?.length})</h1>
          {fetchAll.isFetching && (
            <div
              role="status"
              className="absolute z-10 -translate-x-1/2 -translate-y-1/3 top-1/4 left-1/2"
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
        <div className="my-3">
          <button
            className="rounded bg-red-500 px-4 py-1 text-white hover:bg-red-600"
            onClick={() => resetAll.mutate()}
          >
            Reset ({resetAll.status})
          </button>
          <button
            className="rounded bg-green-500 px-4 py-1 text-white hover:bg-green-600 mx-3"
            onClick={() => addData.mutate(2)}
          >
            Fetch & Save New Data ({addData.status})
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-600 mx-3"
            onClick={() => fetchAll.refetch()}
          >
            Refetch
          </button>
        </div>
        <main>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white ">
                List of records
                <p className="mt-1 text-sm font-normal text-gray-500 ">
                  Combined records of all tests
                </p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  {testRecordKeys.map((d) => (
                    <th key={'th_' + d} scope="col" className="p-3">
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fetchAll.data &&
                  fetchAll.data.map((row) => (
                    <tr
                      onClick={() => Router.push('/r/[id]', `/r/${row.id}`)}
                      key={'row_' + row.id}
                      className="odd:bg-white  even:bg-gray-50  border-b "
                    >
                      {testRecordKeys.map((key) => {
                        return (
                          <td key={key} className="px-3 py-2">
                            {row[key as keyof typeof row]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default TestRecord;