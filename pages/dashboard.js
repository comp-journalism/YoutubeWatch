import 'regenerator-runtime/runtime';
import React, { useMemo, useState, useEffect } from 'react'
import Head from 'next/head'
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Table, {SelectColumnFilter, StatusPill} from '../components/Table'  // new
import { useTable } from 'react-table'
import channeldata from '../components/channel.json'

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/videos'

export async function getServerSideProps() {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${process.env.YOUTUBE_API_KEY}`);
  const data1 = await res.json();
  const data = data1.items;
  return {
    props: {
      data
    }
  }
}

export default function Dashboard({data}) {
    // console.log(data)
    const columnss = [
      {
        Header: "Video Title",
        accessor: "snippet.title",
      },
      {
        Header: "View Count",
        accessor: "statistics.viewCount",
      },
      {
        Header: "Like Count",
        accessor: "statistics.likeCount",
      },
      {
        Header: "Comment Count",
        accessor: "statistics.commentCount",
      },
      {
        Header: "Category",
        accessor: "snippet.categoryId",
        Filter: SelectColumnFilter,  // new
        filter: 'includes',
        Cell: StatusPill,

      },
      
    ]

    const channelcolumnss = [
      {
        Header: "Rank",
        accessor: "rank",
      },
      {
        Header: "Channel",
        accessor: "youtuber",
      },
      {
        Header: "Subscribers",
        accessor: "subscribers",
      },
      {
        Header: "Video Views",
        accessor: "video views",
      },
      {
        Header: "Video Count",
        accessor: "video count",
      },
      {
        Header: "Year Started",
        accessor: "started",
      },
      {
        Header: "Category",
        accessor: "category",

      },

    ]

  // return (
  //   <div>
  //       <Navbar/>

  //       <div className="container">

  //   <div className="flex flex-col">
  //     <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
  //       <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
  //         <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
  //           <table className="min-w-full divide-y divide-gray-200">
  //             <thead className="bg-gray-50">
  //               <tr>
  //                 <th
  //                   scope="col"
  //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                 >
  //                   Video Title
  //                 </th>
  //                 <th
  //                   scope="col"
  //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                 >
  //                   View Count
  //                 </th>
  //                 <th
  //                   scope="col"
  //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                 >
  //                   Like Count
  //                 </th>
  //                 <th
  //                   scope="col"
  //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                 >
  //                   Comment Count
  //                 </th>
  //                 <th
  //                   scope="col"
  //                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
  //                 >
  //                   Tags
  //                 </th>

  //                 <th scope="col" className="relative px-6 py-3">
  //                   <span className="sr-only">More Info</span>
  //                 </th>
  //               </tr>
  //             </thead>
  //             <tbody className="bg-white divide-y divide-gray-200">
  //               {data.map((item,index) => (
  //                 <tr key={index}>
  //                   <td className="px-6 py-4 ">
  //                     <div className="flex items-center">
  //                       <div className="">
  //                         <div className="text-sm font-medium text-gray-900">{item.snippet.title}</div>
  //                         {/* <div className="text-sm text-gray-500">{item.email}</div> */}
  //                       </div>
  //                     </div>
  //                   </td>
  //                   <td className="px-6 py-4 whitespace-nowrap">
  //                     <div className="text-sm text-gray-900">{item.statistics.viewCount}</div>
  //                     {/* <div className="text-sm text-gray-500">{item.department}</div> */}
  //                   </td>

  //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  //                     {item.statistics.likeCount}
  //                   </td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
  //                     {item.statistics.commentCount}
  //                   </td>
  //                   <td className="px-6 py-4 whitespace-nowrap">
  //                     <span
  //                       className="px-2 inline-flex text-xs leading-5
  //                     font-semibold rounded-full bg-green-100 text-green-800"
  //                     >
  //                       {tags[item.snippet.categoryId]}
  //                       {/* {item.snippet.tags[0]} */}

  //                     </span>
  //                   </td>
  //                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
  //                     <a href="#" className="text-indigo-600 hover:text-indigo-900">
  //                       More Info
  //                     </a>
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   </div>


  //       </div>

  //       <Footer/>
  //       </div>
  // )

  const columns = useMemo(() => columnss, [])
  const datas = useMemo(() => data, [])
  const columns2 = useMemo(() => channelcolumnss, [])
  const datas2 = useMemo(() => channeldata, [])

  // const tableInstance = useTable({
  //   columns,
  //   data: datas,
  // })
  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = tableInstance;

  return (
   //set the table to the tableInstance
//    <table className="table table-striped table-sm">
//    <thead>
//      {headerGroups.map((headerGroup) => (
//        <tr {...headerGroup.getHeaderGroupProps()}>
//          {headerGroup.headers.map((column) => (
//            <th {...column.getHeaderProps()} scope="col">
//              {column.render("Header")}
//            </th>
//          ))}
//        </tr>
//      ))}
//    </thead>
//    <tbody {...getTableBodyProps()}>
//      {rows.map((row) => {
//        prepareRow(row);
//        return (
//          <tr {...row.getRowProps()}>
//            {row.cells.map((cell) => {
//              return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
//            })}
//          </tr>
//        );
//      })}
//    </tbody>
//  </table>
<div >
<Navbar />
<div className="container">
<div className="">
<main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
  <div className="mt-6">
    <h1 className="text-xl mb-4 text-gray-600 font-semibold">Widely Viewed Videos</h1>
    <Table columns={columns} data={datas} />
  </div>
</main>
</div>
<div className="mb-8">
<main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
  <div className="mt-6">
  
  <h1 className="text-xl mb-4 text-gray-600 font-semibold">Widely Viewed Channels</h1>
    <Table columns={columns2} data={datas2} />
  </div>
</main>
</div>
</div>
<Footer />
</div>

  )
}

