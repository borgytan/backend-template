import { Factory } from 'rosie';
import moment from 'moment';

Factory.define('user')
  .sequence('id')
  .attr('firstName', 'Ricardo')
  .attr('lastName', 'Bishop')
  .attr('email', 'ricardo.bishop@gmail.com')
  .attr('password', 'password123')
  .attr('createdAt', new Date().toISOString())
  .attr('updatedAt', new Date().toISOString());
