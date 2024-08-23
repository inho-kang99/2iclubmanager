// date picker
import {
  forwardRef,
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect
} from 'react';

import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import '../../test.css';
// import 'react-datepicker/dist/react-datepicker.module.css';

// redux import
import styled from 'styled-components';
import { getMonth, getYear } from 'date-fns';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import toast from 'react-hot-toast';
import { DateIcon, CrossIcons } from '../../icons';
import testStore from '../../../../store/testStore';
// import testStore from '../../../../store/testStore';

const years = [new Date().getFullYear()];
const months = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12'
];
const CommonDatePicker = ({ stateKey }) => {
  const calenderRef = useRef();
  const { setFilterState } = testStore();
  // const scheduleList = [];
  const storeDate = '20240822';
  const [date, setDate] = useState(ReturnToDate(storeDate));

  const [calenderYear, setCalenderYear] = useState(
    ReturnToDate(storeDate).getFullYear()
  );
  const [calenderMonth, setCalenderMonth] = useState(
    ReturnToDate(storeDate).getMonth()
  );

  const calenderDate = useMemo(
    () => new Date(calenderYear, calenderMonth, 1),
    [calenderYear, calenderMonth]
  );

  const ChagneCalenderDate = useCallback(
    (num) => {
      const month = calenderMonth + num;
      if (month > 11) {
        const nextYear = calenderYear + 1;
        if (years.find((i) => i === nextYear)) {
          setCalenderYear(nextYear);
          setCalenderMonth(0);
        } else {
          toast.error('날짜 정보가 없습니다');
          return 'block';
        }
      } else if (month < 0) {
        const nextYear = calenderYear - 1;
        if (years.find((i) => i === nextYear)) {
          setCalenderYear(nextYear);
          setCalenderMonth(11);
        } else {
          toast.error('날짜 정보가 없습니다');
          return 'block';
        }
      } else {
        setCalenderMonth(month);
      }
    },
    [calenderYear, calenderMonth]
  );

  const CheckDate = useCallback(
    (date) => {
      const firstDayOfMonth = new Date(
        calenderDate.getFullYear(),
        calenderDate.getMonth(),
        1
      );

      const lastDayOfMonth = new Date(
        calenderDate.getFullYear(),
        calenderDate.getMonth() + 1,
        0
      );

      return date >= firstDayOfMonth && date <= lastDayOfMonth;
    },
    [calenderDate]
  );

  // const CheckSchedule = useCallback(
  //   (date) => {
  //     const dateForm = Number(
  //       `${date.getFullYear()}${
  //         date.getMonth() + 1 < 10
  //           ? `0${date.getMonth() + 1}`
  //           : date.getMonth() + 1
  //       }${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
  //     );
  //     if (scheduleList.includes(dateForm)) {
  //       return true;
  //     }
  //   },
  //   [scheduleList]
  // );

  // useEffect(() => {
  //   const gmonth = calenderDate.getMonth() + 1;
  //   dispatch(
  //     SearchMonthThunk({
  //       season: calenderDate.getFullYear(),
  //       gmonth
  //     })
  //   );
  // }, [dispatch, calenderDate]);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <DateButton className="example-custom-input" onClick={onClick} ref={ref}>
      <span>{value}</span> <DateIcon />
    </DateButton>
  ));

  ExampleCustomInput.displayName = 'Date';
  // 9=10
  useEffect(() => {
    setFilterState({ stateKey, value: ChangeDateForm(date) });
  }, [setFilterState, date, stateKey]);

  const handleCloseCalendar = () => {
    calenderRef.current.setOpen.call(undefined, false);
  };

  return (
    <div>
      <DatePicker
        ref={calenderRef}
        locale={ko}
        showIcon
        toggleCalendarOnIconClick
        dateFormat="yyyy-MM-dd"
        shouldCloseOnSelect={false}
        selected={date}
        excludeDateIntervals={[
          {
            start: new Date(calenderYear, calenderMonth - 1, 1),
            end: new Date(calenderYear, calenderMonth, 0)
          },
          {
            start: new Date(calenderYear, calenderMonth + 1, 1),
            end: new Date(calenderYear, calenderMonth + 2, 0)
          }
        ]}
        onCalendarClose={() => {
          setCalenderMonth(date.getMonth());
          setCalenderYear(date.getFullYear());
        }}
        onSelect={(date) => {
          if (CheckDate(date)) handleCloseCalendar();
        }}
        onChange={(date) => {
          if (CheckDate(date)) setDate(date);
        }}
        customInput={<ExampleCustomInput />}
        icon={<></>}
        renderDayContents={(day, clickDate) => {
          const checkSelect =
            `${date.getFullYear()}${date.getMonth()}${date.getDate()}` ===
            `${clickDate.getFullYear()}${clickDate.getMonth()}${clickDate.getDate()}`;

          return (
            <DayComponents
              day={day}
              date={clickDate}
              check={CheckDate(clickDate)}
              // schedule={CheckSchedule(clickDate)}
              schedule={true}
              select={checkSelect}
            />
          );
        }}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => {
          return (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                padding: '24px 0 10px 0',
                gap: '20px',
                color: 'white',
                position: 'relative'
              }}
            >
              <CloseButton onClick={handleCloseCalendar}>
                <CrossIcons fill={'#888C95'} />
              </CloseButton>
              <ArrowButton
                onClick={() => {
                  const checkBlock = ChagneCalenderDate(-1);
                  if (!checkBlock) {
                    decreaseMonth(date);
                  }
                }}
                disabled={prevMonthButtonDisabled}
              >
                <MdOutlineArrowBackIos />
              </ArrowButton>
              <div style={{ display: 'flex', gap: '10px' }}>
                <CustomSelect
                  $width={'80px'}
                  disabled
                  value={getYear(date)}
                  onChange={({ target: { value } }) => {
                    setCalenderYear(value);
                    changeYear(value);
                  }}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </CustomSelect>

                <CustomSelect
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) => {
                    changeMonth(months.indexOf(value));
                    setCalenderMonth(months.indexOf(value));
                  }}
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </CustomSelect>
              </div>

              <ArrowButton
                style={{
                  rotate: '180deg'
                }}
                onClick={(date) => {
                  const checkBlock = ChagneCalenderDate(1);
                  if (!checkBlock) {
                    increaseMonth(date);
                  }
                }}
                disabled={nextMonthButtonDisabled}
              >
                <MdOutlineArrowBackIos />
              </ArrowButton>
            </div>
          );
        }}
      />
    </div>
  );
};

export default CommonDatePicker;

const DayWrap = styled.div`
  display: flex;
  width: 36px !important;
  height: 36px !important;
  justify-content: center;

  gap: 4px;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  box-sizing: border-box !important;
  position: relative;
  font-size: 12px;
  padding: 0 !important;
  outline: ${(p) => p.$select && '1px solid #1F5EFF'};
  color: ${(p) => !p.$schedule && p.$check && '#888C95'};
  &:hover {
    background-color: #ffd6e2;
    outline: 1px solid #1f5eff !important;
    div {
      display: flex;
    }
  }
`;

// const DayPoint = styled.div`
//   width: 4px !important;
//   height: 4px !important;
//   color: none !important;
//   display: ${(p) => (p.$schedule ? 'flex' : 'none')};

//   background-color: #1f5eff;
//   position: absolute;
//   border-radius: 50%;
//   left: 50%;
//   bottom: 5px;
//   translate: -50% -50%;
// `;

const DayComponents = ({ day, check, schedule, select }) => {
  return (
    <DayWrap
      style={{ pointerEvents: 'none' }}
      $check={check}
      $select={select}
      $schedule={schedule}
    >
      <span> {day}</span>
      {/* <DayPoint $schedule={schedule} /> */}
    </DayWrap>
  );
};

const DateButton = styled.div`
  display: flex;
  width: 136px;
  height: 40px;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px 8px 16px;
  background-color: #323741;

  border: 1px solid #484d5a;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
`;

const CustomSelect = styled.select`
  width: ${(p) => p.$width || '50px'};
  height: 30px;
  border: none;
  font-weight: 600;
  font-size: 20px;
  color: white;
  background-color: #323741;

  &:focus {
    border: none;
    outline: none;
  }
  option {
    text-align: center;
    font-size: 14px;
  }
`;
const ArrowButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #484d5a;
  background-color: #323741;

  color: #888c95;
  margin: auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
`;

// date 객체를 받음
export const ChangeDateForm = (date) => {
  const year = date.getFullYear();
  const month = `${
    date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
  }`;
  const day = date.getDate();
  return `${year}${month}${day}`;
};

// yyyymmdd 문자열을 받음
export const ReturnToDate = (date) => {
  const year = date?.slice(0, 4);
  const month = Number(date?.slice(4, 6));
  const day = date?.slice(6, 8);

  return new Date(year, month, day);
};

// yyyymmdd 문자열을 받음
export const ChangeRealTime = (date) => {
  // 한달 전 상태의
  const first = ReturnToDate(date);

  const year = first.getFullYear();
  const month = `${
    first.getMonth() + 1 < 10
      ? `0${first.getMonth() + 1}`
      : first.getMonth() + 1
  }`;
  const day = `${
    first.getDate() < 10 ? `0${first.getDate()}` : first.getDate()
  }`;
  return `${year}${month}${day}`;
};
