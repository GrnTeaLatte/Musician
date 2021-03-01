import React, { useMemo } from 'react';
import Table from './Table';
import './styles/table.css';

function Results(data) {
    const columns = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "name",
                style: {
                  textAlign: 'left',
                },
            },
            {
                Header: "Artist",
                accessor: "artists[0].name",
                style: {
                  textAlign: 'left',
                },
            },
            {
                Header: "Album Type",
                accessor: "album.album_type",
            },
            {
                Header: "Track Number",
                accessor: "track_number",
            },
            {
                Header: "Release Date",
                accessor: "album.release_date",
            },
            {
                Header: "Song Length",
                accessor: "duration_ms",
                Cell: ({ cell: { value } }) => {
                  var minutes = Math.floor(value / 60000);
                  var seconds = ((value % 60000) / 1000).toFixed(0);
                  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
                }
            }
        ]
    )
    const tracks = data.results ? data.results : [];

    return (
        <Table columns={columns} data={tracks}/>
    );
}

export default Results;