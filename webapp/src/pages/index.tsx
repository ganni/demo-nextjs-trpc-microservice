import React from 'react';
import Router from 'next/router';
import Layout from '../components/Layout';
import { api } from '@/utils/api';
import { testRecordKeys } from '@/utils/helper';
import Loader from '@/components/Loader';

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
      await addData.mutate();
      await utils.testRecord.getAll.invalidate();
    },
  });
  return (
    <Layout>
      <div className="page ">
        <div className="flex">
          <h1>List of records ({fetchAll.data?.length})</h1>
          {fetchAll.isFetching && <Loader />}
        </div>
        <div className="my-3">
          <button
            className="rounded bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
            onClick={() => fetchAll.refetch()}
          >
            Refetch
          </button>
          <button
            className="rounded bg-green-500 px-4 py-1 text-white hover:bg-green-600 mx-3"
            onClick={() => addData.mutate()}
          >
            Fetch & Save New Data ({addData.status})
          </button>
          <button
            className="rounded bg-red-500 px-4 py-1 text-white hover:bg-red-600"
            onClick={() => resetAll.mutate()}
          >
            Reset ({resetAll.status})
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
