import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

// let columns=[

//   {id: 1, label: 'Question Number', minWidth: 170, align: 'center'},

//   {id: 2, label: 'Sub-Q', minWidth: 170, align: 'center'},
 
//   {id: 3, label: 'Q', minWidth: 170, align: 'center'},

//   {id: 4, label: 'M', minWidth: 170, align: 'center'},

//   {id: 5, label: 'CO', minWidth: 170, align: 'center'},
 
//   {id: 6, label: 'Module', minWidth: 170, align: 'center'}];

// let data=[
//   {
//       "Question Number": "Q1",
//       "Sub-Q": "A)",
//       "Q": "Q1 A) What are Primary Standard? Discuss criteria/Requirements for choosing primary \nstandard substances towards preperation of standard solutions used in titrimetry. 6 CO3 Module 1\nAn-S",
//       "M": "6",
//       "CO": "CO3",
//       "Module": "Module 1",
//       "Bloom's Verbs": "What, Discuss",
//       "Bloom's Texonomy Level": "Knowledge, Comprehension"
//   },
//   {
//       "Question Number": "Q1",
//       "Sub-Q": "B)",
//       "Q": "Q1 B) List different sources of natural water and compare them with respect to Purity, \nImpurities present and their significance.\n--OR--\nDefine hardness of water? Why it is caused. List different units used to measure \nhardness of water with interrelation among them.6 CO2 Module 2\nDesc",
//       "M": "6",
//       "CO": "CO2",
//       "Module": "Module 2",
//       "Bloom's Verbs": "List, compare, Define, Why, List, measure",
//       "Bloom's Texonomy Level": "Knowledge, Comprehension, Knowledge, Knowledge, Knowledge, Evaluation"
//   },
//   {
//       "Question Number": "Q1",
//       "Sub-Q": "C)",
//       "Q": "Q1 C) With neat labeled diagram, discuss Pb-Ag system. 6 CO1 Module 3\nObj",
//       "M": "6",
//       "CO": "CO1",
//       "Module": "Module 3",
//       "Bloom's Verbs": "discuss",
//       "Bloom's Texonomy Level": "Comprehension"
//   },
//   {
//       "Question Number": "Q2",
//       "Sub-Q": "A)",
//       "Q": "Q2 A) Define alloy and discuss with example purposes of making alloys.\n--OR--\nWhat are carbon steels? How are they classified? Give composition, properties and \nuses of High Carbon Steel.4 CO3 Module 4\nObj",
//       "M": "4",
//       "CO": "CO3",
//       "Module": "Module 4",
//       "Bloom's Verbs": "Define, discuss, What, How, Give",
//       "Bloom's Texonomy Level": "Knowledge, Comprehension, Knowledge, Comprehension, Knowledge"
//   },
//   {
//       "Question Number": "Q2",
//       "Sub-Q": "B)",
//       "Q": "Q2 B) State compound composition of Portland cement and mention functions of each \nconstituent in setting and hardening of Portland cement with reactions.6 CO3 Module 4\n(P .T .O.)Desc",
//       "M": "6",
//       "CO": "CO3",
//       "Module": "Module 4",
//       "Bloom's Verbs": "State",
//       "Bloom's Texonomy Level": "Knowledge"
//   },
//   {
//       "Question Number": "Q3",
//       "Sub-Q": "A)",
//       "Q": "Q3 A) With neat labeled diagram discuss constuction and working of TGA equipment. With \nproper example describe TGA thermogram. List at least four applications. 10 CO1 Module 6\nAn-M",
//       "M": "10",
//       "CO": "CO1",
//       "Module": "Module 6",
//       "Bloom's Verbs": "discuss, describe, List",
//       "Bloom's Texonomy Level": "Comprehension, Knowledge, Knowledge"
//   },
//   {
//       "Question Number": "Q3",
//       "Sub-Q": "B)",
//       "Q": "Q3 B) Following data was recorded while determining calorific value of gaseous fuel by \nBoy’s gas calorimeter.\ni) V olume of gas burnt at STP = 0.09m3\nii) Mass of water used in time ‘t’ = 24 Kg\niii)Temperature of inlet water = 22 0C\niv) Temperature of outlet  water = 35 0C\nv) Mass of steam condensed = 0.03 Kg\nCalculate Higher and Lower calorific value.\n(Given: Latent heat of condensation of water vapour 587 Kcal/Kg)\n3 CO2 Module 5\nAn-M",
//       "M": "3",
//       "CO": "CO2",
//       "Module": "Module 5",
//       "Bloom's Verbs": "Calculate",
//       "Bloom's Texonomy Level": "Application"
//   },
//   {
//       "Question Number": "Q3",
//       "Sub-Q": "C)",
//       "Q": "Q3 C) A sample of coal containing 5% hydrogen was tested in Bomb Calorimeter for it’s \ncalorific value, following data were recorded. Weight of coal burnt= 0.98gm, Acid \ncorrection = 55 Cal. Rise in temperature = 2.52 0C, Water equivalent of bomb & \ncalorimeter = 550 gm, Weight of water taken in copper calorimeter = 2200 gm     \nLatent heat of condensation of steam = 587 cal/gm\nCalculate Gross & Net calorific value.4 CO2 Module 5\nAn-M",
//       "M": "4",
//       "CO": "CO2",
//       "Module": "Module 5",
//       "Bloom's Verbs": "Calculate",
//       "Bloom's Texonomy Level": "Application"
//   },
//   {
//       "Question Number": "Q3",
//       "Sub-Q": "D)",
//       "Q": "Q3 D) Compare solid and gaseous fuels with respect to Calorific value,Ignition temperature, \nVelocity of combustion, Control of combustion, Risk of fire hazard, use for IC \nengines, Transport and storage, Products of combustion.5 CO2 Module 2(P .T .O.)DONOT MAKE THIS DOCU PUBLIC\nSELECT COURSE CODE\nDr. Pendse M.H. - Powar A.A.\n218\n20%\n(P .T .O.)",
//       "M": "5",
//       "CO": "CO2",
//       "Module": "Module 2",
//       "Bloom's Verbs": "Compare, use",
//       "Bloom's Texonomy Level": "Comprehension, Application"
//   }
// ];



const StickyHeadTable=({data,columns,type="normal",negative=0})=>{
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '95%', overflow: 'hidden', margin: '0 auto' }}>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, background:"#282828ad", color:"white" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={Math.random().toString(36).substr(2, 9)}>
                    {columns.map((column) => {
                      const value = row[column.label];
                      return (
                        <TableCell style={{background:(column.label=="Deviation")?(negative<0)?"#ff9494":"#96ff94":"white", color:(column.lebel=="Deviation" && negative<0)?"#ff0000":"black",fontWeight:(column.label=="Deviation")?"bold":"normal"}} key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}

export default StickyHeadTable