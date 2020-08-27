import React, { useCallback, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { Container, Header, HeaderContent, Profile, Content, Schedule, NextAppointment, Section, Appointment, Calendar } from './styles';
import { FiPower, FiClock } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';


const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
      if (modifiers.available)
      setSelectedDate(day);
  }, [])

  const { signOut, user } = useAuth();
  console.log(user);
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber"/>
          <Profile>
            <img
              src="https://avatars1.githubusercontent.com/u/42452176?s=460&u=a56347993bc05a05cb026f07653e0e2d8306dabe&v=4"
              alt="Eber Lawrence"
            />
            <div>
              <span>Bem-vindo</span>
              <strong>Eber Lawrence</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
                <img src="https://avatars1.githubusercontent.com/u/42452176?s=460&u=a56347993bc05a05cb026f07653e0e2d8306dabe&v=4" alt="Eber Lawrence"/>
                <strong>Eber Lawrence</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
            </div>
          </NextAppointment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                  <FiClock />
              </span>
              <div>
                <img src="https://avatars1.githubusercontent.com/u/42452176?s=460&u=a56347993bc05a05cb026f07653e0e2d8306dabe&v=4" alt="Eber Lawrence"/>
                <strong>Eber Souza</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
            <Appointment>
              <span>
                <FiClock />
              </span>
              <div>
                <img src="https://avatars1.githubusercontent.com/u/42452176?s=460&u=a56347993bc05a05cb026f07653e0e2d8306dabe&v=4" alt="Eber Lawrence"/>
                <strong>Eber Souza</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>
        <Calendar>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}

            disabledDays={[{ daysOfWeek: [0, 6]}]}
            modifiers={{ available: {daysOfWeek: [1, 2, 3, 4, 5]},}}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
               'Dezembro',
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default Dashboard;
