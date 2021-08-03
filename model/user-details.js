const mongoose = require("mongoose");
const { Schema } = mongoose;

const userDetails = new Schema ({
  user_id: {type: Schema.ObjectId, ref: 'users'},
  container: [
    {
      container_title: {
        type: String,
        required: true,
      },
      container_count: Number,
      container_icon: String,
    }
  ],
  data: {
    pageName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
        required: true,
      },
    ],
    profile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    name2: {
      type: String,
      required: true,
    },
    about_me: {
      type: String,
      required: true,
    },
    about_me1: {
      type: String,
      required: true,
    },
    about_me2: {
      type: String,
      required: true,
    },
    portfolio_p: {
      type: String,
      required: true,
    },
    services_p: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    get_in_touch_p: {
      type: String,
      required: true,
    },
    footer1: {
      type: String,
      required: true,
    },
    footer2: {
      type: String,
      required: true,
    },
    footer3: {
      type: String,
      required: true,
    },
    footer4: {
      type: String,
      required: true,
    }
  },
  portfolio: [{
    portfolio_title: {
      type: String,
      required: true,
    },
    portfolio_category: {
      type: String,
      required: true,
    },
    portfolio_date: {
      type: String,
      required: true,
    },
    portfolio_img: {
      type: String,
      required: true,
    }
  }],
  services: [
    {
      services_title: String,
      services_description: String,
      services_icon: String,
    },
  ]
});

