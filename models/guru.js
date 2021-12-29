const mongoose = require('mongoose')

const guruSchema = new mongoose.Schema({
  "details": {
    "company": {
      "type": "String"
    },
    "guru": {
      "type": "String"
    },
    "MRQ": {
      "type": "String"
    },
    "MRQ_1": {
      "type": "String"
    },
    "currentGuruYear": {
      "type": "String"
    },
    "previousGuruQuartalYear": {
      "type": "String"
    },
    "guruImage": {
      "type": "String"
    },
    "guruID": {
      "type": "String"
    }
  },
  "daten": {
    "1999": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2000": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2001": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2002": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2003": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2004": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2005": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2006": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2007": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2008": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2009": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2010": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2011": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2012": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2013": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2014": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2015": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2016": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2017": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2018": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      }
    },
    "2019": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        },
        "infoTable": {
          "type": [
            "Mixed"
          ]
        }
      }
    },
    "2020": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        },
        "infoTable": {
          "type": [
            "Mixed"
          ]
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        },
        "infoTable": {
          "type": [
            "Mixed"
          ]
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        },
        "infoTable": {
          "type": [
            "Mixed"
          ]
        }
      },
      "Q4": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        },
        "infoTable": {
          "type": [
            "Mixed"
          ]
        }
      }
    },
    "2021": {
      "Q1": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        },
        "infoTable": {
          "type": [
            "Mixed"
          ]
        }
      },
      "Q2": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        },
        "infoTable": {
          "type": [
            "Mixed"
          ]
        }
      },
      "Q3": {
        "totalValue": {
          "type": "String"
        },
        "totalHoldings": {
          "type": "String"
        },
        "infoTable": {
          "type": [
            "Mixed"
          ]
        }
      }
    }
  }
})

module.exports = mongoose.model('gurus', guruSchema)
