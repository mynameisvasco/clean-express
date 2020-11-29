import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column({ select: false })
  public password: string;
}

export default User;
