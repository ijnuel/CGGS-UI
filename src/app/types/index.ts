import {
  LoginPayloadInterface,
  UserRolesEnum,
  LoginResponseInterface,
} from './auth';

interface GenericResponseInterface<T> {
  error: string;
  exceptionError: string;
  message: string;
  messages: string[];
  entity: T;
  succeeded: boolean;
}

export {
  GenericResponseInterface,
  LoginPayloadInterface,
  LoginResponseInterface,
  UserRolesEnum,
};
