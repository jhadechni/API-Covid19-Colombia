const controller = {};
const Model = require('../models/dataModel');


//Ocupacion de UCI's
controller.getUCIOcupation =  async (req,res) => {
    const casos = await Model.aggregate([
        { 
            "$match" : { 
                "$or" : [
                    { 
                        "Ubicacion" : "Hospital UCI"
                    }, 
                    { 
                        "$and" : [
                            { 
                                "Ubicacion" : "Hospital"
                            }, 
                            { 
                                "Departamento" : req.params.Departamento
                            }
                        ]
                    }
                ]
            }
        }, 
        { 
            "$group" : { 
                "_id" : { 

                }, 
                "COUNT(Caso)" : { 
                    "$sum" : 1
                }
            }
        }, 
        { 
            "$project" : { 
                "Ocupacion_UCI" : "$COUNT(Caso)", 
                "_id" : 0
            }
        }
    ]);
    console.log(casos);
    res.json({
          casos
    })
}

//MuertosByDepartment
controller.Deaths = async (req,res) => {
    console.log(req.params.Departamento);
    const casos = await Model.aggregate([
            { 
                "$match" : { 
                    "Departamento" : req.params.Departamento, 
                    "$or" : [
                        { 
                            "Recuperado" : "Fallecido"
                        }, 
                        { 
                            "Recuperado" : "fallecido"
                        }
                    ]
                }
            }, 
            { 
                "$group" : { 
                    "_id" : { 
    
                    }, 
                    "COUNT(Caso)" : { 
                        "$sum" : 1
                    }
                }
            }, 
            { 
                "$project" : { 
                    "Muertos" : "$COUNT(Caso)", 
                    "_id" : 0
                }
            }
    ]);
    console.log(casos);
    res.json({
          casos
    })
}


//RecuperadosByDepartment
controller.recuperados= async (req,res) => {
    console.log(req.params.Departamento);
    const casos = await Model.aggregate([
            { 
                "$match" : { 
                    "Recuperado" : "Recuperado", 
                    "Departamento" : req.params.Departamento
                }
            }, 
            { 
                "$group" : { 
                    "_id" : { 
    
                    }, 
                    "COUNT(Caso)" : { 
                        "$sum" : 1
                    }
                }
            }, 
            { 
                "$project" : { 
                    "Recuperados" : "$COUNT(Caso)", 
                    "_id" : 0
                }
            }
    ]);
    console.log(casos);
    res.json({
          casos
    })
}

//NewCasesByDepartment
controller.NewCases= async (req,res) => {
    const casos = await Model.aggregate(
        [
            { 
                "$match" : { 
                    "Departamento" : req.params.Departamento
                }
            }, 
            { 
                "$group" : { 
                    "_id" : { 
    
                    }, 
                    "COUNT(Caso)" : { 
                        "$sum" : 1
                    }
                }
            }, 
            { 
                "$project" : { 
                    "Numero_Casos" : "$COUNT(Caso)", 
                    "_id" : 0
                }
            }
        ]
    );
    console.log(casos);
    res.json({
          casos
    })
}

//MenByDepartment
controller.menbyDpto = async (req,res) => {
    const casos = await Model.aggregate(
        [
            { 
                "$match" : { 
                    "$or" : [
                        { 
                            "Sexo" : "m"
                        }, 
                        { 
                            "Sexo" : "M"
                        }
                    ], 
                    "Departamento" : req.params.Departamento
                }
            }, 
            { 
                "$group" : { 
                    "_id" : { 
    
                    }, 
                    "COUNT(Caso)" : { 
                        "$sum" : 1
                    }
                }
            }, 
            { 
                "$project" : { 
                    "Hombres" : "$COUNT(Caso)", 
                    "_id" : 0
                }
            }
        ]
    );
    console.log(casos);
    res.json({
         casos
    })
}

//WomenByDepartment
controller.womenbyDpto = async (req,res) => {
    const casos = await Model.aggregate(
        [
            { 
                "$match" : { 
                    "$or" : [
                        { 
                            "Sexo" : "f"
                        }, 
                        { 
                            "Sexo" : "F"
                        }
                    ], 
                    "Departamento" : req.params.Departamento
                }
            }, 
            { 
                "$group" : { 
                    "_id" : { 
    
                    }, 
                    "COUNT(Caso)" : { 
                        "$sum" : 1
                    }
                }
            }, 
            { 
                "$project" : { 
                    "Mujeres" : "$COUNT(Caso)", 
                    "_id" : 0
                }
            }
        ]
    );
    console.log(casos);
    res.json({
        casos
    })
}

//GroupDepartmentById
controller.departmentData = async (req,res) => {
    const casos = await Model.aggregate([
        { 
            "$group" : { 
                "_id" : { 
                    "Departamento" : "$Departamento"
                }, 
                "COUNT(Caso)" : { 
                    "$sum" : 1
                }
            }
        }, 
        { 
            "$project" : { 
                "Departamento" : "$_id.Departamento", 
                "Numero_Casos" : "$COUNT(Caso)", 
                "_id" : 0
            }
        }
    ]);
    console.log(casos);
    res.json({
          casos
    })
}

//getAllCases
controller.getAllCases= async (req,res) => {
   const num = await Model.find().count();
   console.log(num);
   res.json({Number_of_cases : num});
}

//getAllRecuperados
controller.getAllRecuperados= async (req,res) => {
    const casos = await Model.find({Recuperado : 'Recuperado'}).count();
    console.log(casos);
    res.json({
           Casos_Recuperados : casos
    })}

//getAllDeaths
controller.getAllDeaths= async (req,res) => {
    const casos = await Model.find({Recuperado: 'Fallecido'}).count();
    console.log(casos);
    res.json({
           Muertos : casos
    })}
//top10
controller.top10results = async(req,res) => {
    const casos = await Model.aggregate([
        { 
            "$group" : { 
                "_id" : { 
                    "Departamento" : "$Departamento"
                }, 
                "Casos" : { 
                    "$sum" : 1
                }
            }
        }, 
        { 
            "$project" : { 
                "Departamento" : "$_id.Departamento", 
                "Casos" : "$Casos", 
                "_id" : 0
            }
        }, 
        { 
            "$sort" : { 
                "Casos" : -1
            }
        }, 
        { 
            "$limit" : 10
        }
    ]);
    console.log(casos);
    res.json({
          casos
    })
}


module.exports = controller;