// TODO: Add resolvers for cat
// 1. Queries
// 1.1. cats
// 1.2. catById
// 1.3. catsByOwner
// 1.4. catsByArea
// 2. Mutations
// 2.1. createCat
// 2.2. updateCat
// 2.3. deleteCat

import catModel from '../models/catModel';
import {Cat} from '../../interfaces/Cat';
import userModel from '../models/userModel';

export default {
  Query: {
    cats: async () => {
      return catModel.find();
    },
    catById: async (_: undefined, args: {id: string}) => {
      return catModel.findById(args.id);
    },
    catsByOwner: async (_: undefined, args: {owner: string}) => {
      return catModel.find({owner: args.owner});
    },
    catsByArea: async (_: undefined, args: {area: string}) => {
      return catModel.find({area: args.area});
    },
  },
  Mutation: {
    createCat: async (_: undefined, args: Cat) => {
      const newCat = new catModel(args);

      const owner = await userModel.findById(args.owner);
      if (!owner) {
        throw new Error('Owner not found');
      }
      newCat.owner = owner;
      await newCat.save();
      return newCat;
    },
    updateCat: async (_: undefined, args: Cat): Promise<Cat> => {
      const updatedCat = await catModel.findByIdAndUpdate(
        args.id,
        {...args},
        {
          new: true,
        }
      );
      if (!updatedCat) {
        throw new Error('No cat found with id' + args.id);
      }
      return updatedCat;
    },
    deleteCat: async (_: undefined, args: {id: string}): Promise<Cat> => {
      const catToDelete = await catModel.findById(args.id);
      if (!catToDelete) {
        throw new Error('No cat found with this id' + args.id);
      }
      return catToDelete;
    },
  },
};
