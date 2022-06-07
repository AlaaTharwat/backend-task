import HttpException from './HttpException';

class GroupNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Group with id ${id} not found`);
  }
}

export default GroupNotFoundException;
