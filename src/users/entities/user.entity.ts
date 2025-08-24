import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CalendarEvent } from '../../calendar-events/entities/calendar-event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => CalendarEvent, (event) => event.user)
  calendarEvents: CalendarEvent[];
}
