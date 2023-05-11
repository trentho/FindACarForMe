// import {
//     Button,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Pagination,
//     Paginationitem,
//     Select,
//     Typography,
//     Stack,
// } from "@mui/material";
// import { Box } from "@mui/system";
// import { useSearchParams } from "react-router-dom";

// const cardPaginationProps = {

//     count: Number,
//     perPage: Number,
//     page: Number,
//     onChange: (event, value) => {
//         console.log(value);
//     }

// }

// const CardPagination = ({ count, perPage, page, onChange }) => {
    
//         const [searchParams, setSearchParams] = useSearchParams();
    
//         const handleChange = (event, value) => {
//             setSearchParams({ page: value });
//             onChange(event, value);
//         };
    
//         return (
//             <Box sx={{ display: "flex", justifyContent: "center" }}>
//                 <Pagination
//                     count={Math.ceil(count / perPage)}
//                     page={page}
//                     onChange={handleChange}
//                     color="primary"
//                 />
//             </Box>
//         );
//     };

// export default CardPagination;


