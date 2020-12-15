'use strict';
const categories = {
  "Médico": [
    {
      "specialties": [
          "Alergia e Inmunologia",
          "Audiologia - Audiometria",
          "Cardiologia",
          "Cirugia Cardiovascular",
          "Medico Clínico"
      ],
      "establishments": ["Consultorio Particular","Centro Médico"],
      // "services":{"Consulta en Consultorio"},
    }
  ],
  "Odontologico": [
    {
      "specialties":[
        "Odontologia en General",
        "Ortodoncia",
        "Endodoncia",
        "Periodoncia",
        "Odontología estética o cosmética"
      ],
      "establishments": [
        "Consultorio Particular",
        "Centro Odontológico"
      ],
      // "services":{"Consulta en Consultorio"},
    }
  ],
  "Estético": [
    {
      "specialties": ["Masajista", "SPA", "Peluqueria", "Depilación"],
      "establishments": ["Local Particular","Centro de Estética"],
    // "services":{"Turno"]},
    }
  ],
  "Deportivo":  [
    {
      "specialties": ["Alquiler canchas de Futbol", "Alquiler canchas de Tenis", "Alquiler canchas de Voley", "Alquiler canchas de Ping Pong"],
      "establishments": ["Centro Deportivo", "Club"],
      // "services":["Alquiler de cancha"]},
    }
  ]
}


module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      var id = 1
      for (var category in categories){
        await queryInterface.bulkInsert('Categories', [{
          // id: id,
          name: category,
          createdAt: new Date(),
          updatedAt: new Date()
        }]);

        var specialties = categories[category][0].specialties;
        for (var key in specialties){
          var specialty = specialties[key];
          await queryInterface.bulkInsert('Specialties', [{
            categoryId: id,
            name: specialty,
            createdAt: new Date(),
            updatedAt: new Date()
          }]);
        }

        var establishmentTypes = categories[category][0].establishments;
        for (var key in establishmentTypes){
          var establishmentType = establishmentTypes[key];
          await queryInterface.bulkInsert('EstablishmentTypes', [{
            categoryId: id,
            name: establishmentType,
            createdAt: new Date(),
            updatedAt: new Date()
          }]);
        }
        // for (var key in value[0].specialties){
        //   var value1 = value[0].specialties[key];
        //   console.log(value1)
        // }
        id++
      }

      const statuses = ['Disponible','Reservado', 'No disponible', 'Cancelado','Con demora', 'Ausente con aviso', 'Ausente sin aviso', ];
      for (var key in statuses){
        var status = statuses[key];
        await queryInterface.bulkInsert('Statuses', [{
          name: status,
          createdAt: new Date(),
          updatedAt: new Date()
        }]);
      }

      const medicalInsurances = {
        'Swiss Medical Group': [
          'Swiss Medical', '20234355321', 'sm@mail.com', '01123232231', 'prepaga',
        ],
        'IOMA': [
          'IOMA', '20412331234', 'ioma@mail.com','01152346345', 'obra social',
        ],
        'OSDE': [
          'OSDE', '20756765329', 'osde@mail.com','01164564564', 'obra social',
        ],
      };
      for (var key in medicalInsurances){
        var medicalInsurance = medicalInsurances[key];
        await queryInterface.bulkInsert('medicalInsurances', [{
          name: key,
          business_name: medicalInsurance[0],
          cuit: medicalInsurance[1],
          email: medicalInsurance[2],
          contact_phone: medicalInsurance[3],
          type: medicalInsurance[4],
          createdAt: new Date(),
          updatedAt: new Date()
        }]);
      }

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Cities', null, {});

  }
};
