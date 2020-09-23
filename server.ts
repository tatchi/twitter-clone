import { createServer, Model, Factory } from 'miragejs';
import { add, parseISO } from 'date-fns';
import faker, { image, name, internet, lorem } from 'faker';

faker.seed(123);

let startingDate = parseISO('2020-01-14');
let server = createServer({
  timing: 1000,
  models: {
    tweet: Model,
  },

  factories: {
    tweet: Factory.extend({
      name() {
        return name.findName();
      },

      username() {
        return internet.userName();
      },

      text() {
        return lorem.sentence();
      },

      avatarUrl() {
        return image.avatar();
      },

      date(i) {
        return add(startingDate, { days: i }).toISOString();
      },

      // fromSam: trait({
      //   name: 'Sam Selikoff',
      //   username: 'samselikoff',
      //   avatarUrl: 'http://twivatar.glitch.me/samselikoff',
      // }),
    }),
  },

  routes() {
    this.passthrough();
    this.namespace = 'api';
    this.get('tweets');
  },

  seeds(server) {
    server.createList('tweet', 50);
  },
});

setInterval(() => {
  server.create('tweet');
}, 5000);
