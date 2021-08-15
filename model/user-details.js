const mongoose = require("mongoose");
const { Schema } = mongoose;

const userDetails = new Schema ({
  user_id: {type: Schema.ObjectId, ref: 'users'},
  container: [
    {
      container_title: {
        type: String,
      },
      container_count: Number,
      container_icon: String,
    }
  ],
  data: {
    pageName: {
      type: String
    },
    name: {
      type: String
    },
    fullName: {
      type: String
    },
    skills: [
      {
        type: String
      },
    ],
    profile: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    about_me1: {
      type: String,
    },
    about_me2: {
      type: String,
    },
    about_me3: {
      type: String,
    },
    portfolio_p: {
      type: String,
    },
    services_p: {
      type: String,
    },
    address: {
      type: String,
    },
    get_in_touch_p: {
      type: String
    }
  },

  footer: {
    footer1: {
      type: String,
    },
    footer2: {
      type: String,
    },
    footer3: {
      type: String,
    },
    footer4: {
      type: String,
    }
  },

  portfolio: [
    {
    portfolio_title: {
      type: String
    },
    portfolio_category: {
      type: String
    },
    portfolio_date: {
      type: String
    },
    portfolio_img: {
      type: String
    }
  }
],

  services: [
    {
      services_title: String,
      services_description: String,
      services_icon: String,
    }
  ]
});

module.exports =  mongoose.model('UserDetail', userDetails);

