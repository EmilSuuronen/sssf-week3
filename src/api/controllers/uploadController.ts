// TODO: create a controller to send the data of uploaded cat
// to the client
// data to send is described in UploadMessageResponse interface

import UploadMessageResponse from '../../interfaces/UploadMessageResponse';
import {Point} from 'geojson';
import CustomError from '../../classes/CustomError';
import {Request, Response, NextFunction} from 'express';

const catPost = async (
  req: Request,
  res: Response<UploadMessageResponse, {coords: Point}>,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      const err = new CustomError('Invalid file', 400);
      throw err;
    }

    const response: UploadMessageResponse = {
      message: 'file uploaded',
      data: {
        filename: req.file.filename,
        location: res.locals.coords,
      },
    };
    res.json(response);
  } catch (error) {
    next(new CustomError((error as Error).message, 400));
  }
};

export {catPost};
