const { Router } = require('express');
const router = Router();
const {getUCIOcupation,Deaths,recuperados,NewCases,menbyDpto, 
      womenbyDpto, departmentData, getAllCases, getAllRecuperados,getAllDeaths,top10results} 
      = require('../controllers/routes.controller');


router.route('/')
      .get((req,res) => {
            res.json(
            {message: 'Iam an API development by Jaime Sierra, Victor Mendoza and Daniel Carrillo!, Hello World!'})})

router.route('/getUCIOcupation/:Departamento')
      .get(getUCIOcupation)
      

router.route('/Deaths/:Departamento')
      .get(Deaths)   

router.route('/recuperados/:Departamento')
      .get(recuperados)           

router.route('/NewCases/:Departamento')
      .get(NewCases)           
            
router.route('/getMenByDepartment/:Departamento')
      .get(menbyDpto)  

router.route('/getWomenByDepartment/:Departamento')
      .get(womenbyDpto)  
//---------------------------------------------------------------------------------
router.route('/groupDepartmentByID')
      .get(departmentData)

router.route('/getAllCases')
      .get(getAllCases)

router.route('/getAllRecuperados')
      .get(getAllRecuperados)     

router.route('/getAllDeaths')
      .get(getAllDeaths)

router.route('/top10')
      .get(top10results)

module.exports = router;