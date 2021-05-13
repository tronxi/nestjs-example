import { HttpException } from "@nestjs/common";
import { DomainException } from "./domain.exception";

export class UserNotFoundExeption extends DomainException {
}
