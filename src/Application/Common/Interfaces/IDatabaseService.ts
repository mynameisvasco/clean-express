import User from "@Domain/Entities/User";
import { Repository } from "typeorm";

interface IDatabaseService {
  init(): Promise<void>;
  users(): Repository<User>;
}

export default IDatabaseService;
