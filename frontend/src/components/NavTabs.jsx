import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/courses', label: '강의목록' },
  { to: '/my-enrollments', label: '내 신청목록' },
  { to: '/timetable', label: '시간표' },
];

export default function NavTabs() {
  return (
    <nav className="border-b border-chalk mb-6">
      <div className="max-w-4xl mx-auto px-6 flex gap-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `px-4 py-3 text-[14px] font-semibold border-b-2 -mb-px transition-colors ${
                isActive
                  ? 'border-cobalt text-cobalt'
                  : 'border-transparent text-graphite hover:text-ink'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
