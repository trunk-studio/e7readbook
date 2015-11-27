import chai from 'chai';
import request from 'supertest-as-promised';
import sinon from 'sinon';
import liftApp from '../app';
chai.should();
global.sinon = sinon;


before(async (done) => {
  try {
    let app = await liftApp();
    global.app = app;
    global.request =
      request.agent(app.listen());
    done();

  } catch (e) {
    done(e);
  }
});
