import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import 'dotenv/config';
import { withItemData, statelessSessions} from '@keystone-next/keystone/session';
import { insertSeedData } from './seed-data';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: process.env.COOKIE_SECRET,
};


const { withAuth } = createAuth({
        listKey: 'User', //its the User that loggs in
        identityField: 'email', //field we use to identofy the user
        secretField: 'password',
        // the first time the user authenticates with
        initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO: Add in inital roles here
    },
});



export default withAuth(
    // server config
  config({
    // @ts-ignore
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    // database connection
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      //Add data seeding
      async onConnect(keystone) {
        //   check if we are running the specific command to seed th data
          if(process.argv.includes('--seed-data'))
            await insertSeedData(keystone);
          }
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
      ProductImage
    }),
    ui: {
      // Show the UI only for people that are logged in
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    // 
    session: withItemData(statelessSessions(sessionConfig), {
      // GraphQL Query
      User: 'id name email',
    }),
  })
);