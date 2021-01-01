'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Posts', [
    {
      body: 'The internet is full of hospital bag packing lists and checklists and while I was perusing Pinterest a while back I noticed a “Minimalist Hospital Packing List” which included crazy things you definitely do not need to bring to the hospital (and which certainly were not “minimalistic”). So, I thought it might be helpful to know what will be in my bag when I head to the hospital for Patpat’s birth day.',
      contentUrl: 'https://mindonmed.com/wp-content/uploads/2018/11/IMG_6930-1270x954.jpg',
      tags:'mommybag',
      userId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      body: "One of the more difficult things for me figure out as a working mom has been when and how to let my babies have more independence.The reason for this is two- fold.On one hand I truly enjoy doing things for them and want to let this phase linger as long as it can.On the other hand, I am goal - oriented and thrive on efficiency, so I sometimes struggle with letting the kids work longer to achieve something I could do for them in half the time(especially when we’re running late!). A few months ago we started having the twins(who are 5yo) use an alarm clock to get up and get ready on their own.They loved it, but I felt like I spent my whole morning coordinating their to -do list and reminding them what else to do(teeth brushed? lovey in backpack ? shoes & socks ?).Since this inevitably interfered with my own ability to get the morning going efficiently, it seemed their move towards independence would just end in chaos or yelling.",
      contentUrl:'https://mindonmed.com/wp-content/uploads/2018/08/DSC09246-1270x847.jpg',
      tags:"morning",
      userId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      body: "We’re about to get real up in here and talk about something I think is so important to talk about publicly. So, if me talking about nursing my babies ain’t your thing feel free to exit now…otherwise, prepare yourself to get a tiny bit little personal. (P.S.Mind On Medicine could be abbreviated to M.O.M.Can we all take a moment to relish how ridiculously fitting that is ?). I knew when I was pregnant that I wanted to give breastfeeding a good ole college try.I would give it a go, see how it went, and hope for the best.When I found out we were having twins I became even more okay with supplementing formula or completely formula feeding if nursing didn’t work out.My number one goal was happy babies and happy mommy, however that happened was fine.However, I did know I wanted to give it my best shot, since breastfeeding is the best thing for babies and has some awesome benefits for mom as well (lower rates of some cancers, weight management, lower risk of post - partum depression, etc.).",
      contentUrl: 'https://mindonmed.com/wp-content/uploads/2013/04/2013-03-30-14.21.36.jpg',
      tags:"breast",
      userId:3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
