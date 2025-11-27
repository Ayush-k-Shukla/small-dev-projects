import { useEffect, useRef } from 'react';

import { mount } from 'vueRemote/App';

const VueRemoteWrapper = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mount(ref.current);
    }
  }, []);

  return <div ref={ref} />;
};

const App = () => {
  return (
    <div style={{ border: '1px solid blue', padding: '20px' }}>
      <h1>React Host Application</h1>
      <p>This is a React application hosting a Vue remote.</p>
      <div
        style={{ border: '1px solid red', padding: '20px', marginTop: '20px' }}
      >
        <VueRemoteWrapper />
      </div>
    </div>
  );
};

export default App;
