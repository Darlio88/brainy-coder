import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';

//all challenges
import useChallenges from '../../hooks/useChallenges';
import insertId from '../../utils/insertId';
import { IChallenge } from '../../interfaces/challengeInterface';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'title',
        headerName: 'Title',
        width: 350,
    },
    {
        field: 'creator',
        headerName: 'Creator',
        width: 150,
    },
    {
        field: 'verified',
        headerName: 'Verified',
        type: 'boolean',
        width: 110,
    },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params: GridValueGetterParams) =>
    //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
];

const rows = [
    { id: 1, title: 'Snow', creator: 'Jon', attempts: 35 },
    { id: 2, title: 'Lannister', creator: 'Cersei', attempts: 42 },
    { id: 3, title: 'Lannister', creator: 'Jaime', attempts: 45 },
    { id: 4, title: 'Stark', creator: 'Arya', attempts: 16 },
    { id: 5, title: 'Targaryen', creator: 'Daenerys', attempts: null },
    { id: 6, title: 'Melisandre', creator: null, attempts: 150 },
    { id: 7, title: 'Clifford', creator: 'Ferrara', attempts: 44 },
    { id: 8, title: 'Frances', creator: 'Rossini', attempts: 36 },
    { id: 9, title: 'Roxie', creator: 'Harvey', attempts: 65 },
];

export default function DataGridDemo() {
    const navigate = useNavigate();
    const allChallenges = useChallenges();
    function handleClick(event: GridRowParams<any>) {
        const rowId = event.id as number;
        console.log(event.id);
        const challenge = insertId(allChallenges as IChallenge[])[rowId - 1];
        navigate(`solve/${challenge._id}`);
    }
    if (!allChallenges || !(allChallenges.length > 0)) {
        return (
            <div className="h-[60%] flex items-center flex-col w-[100vw] mb-8 text-lg text-emerald-950">
                <div className="flex justify-center items-center h-[40%]">
                    <img
                        src="/no-data-bro.png"
                        alt="error-robot"
                        className="block max-w-[480px] md:max-w-[360px]"
                    />
                </div>
                <div className="mb-9 flex-1">
                    <p className="text-center text-base">
                        Sorry there are no challenges
                        <Link className="ml-2" to="/create">
                            Create One!!
                        </Link>
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="h-[400px] w-[100%]">
            <DataGrid
                className="text-emerald-900"
                // rows={rows}
                rows={insertId(allChallenges)}
                onRowClick={handleClick}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                // checkboxSelection
                // disableRowSelectionOnClick
            />
        </div>
    );
}
