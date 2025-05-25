
import './globals.css';
import { AuthProvider } from '@/provider/authProvider';
import ThemeRegistry from '../themes/themeRegistry';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

export const metadata = {
  title: 'BI Tool Assessment',
  description: 'A mini Business Intelligence tool with authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
       
        <ThemeRegistry>
          <AuthProvider>
            {children} 
            <ToastContainer
              position="top-right"
              newestOnTop={false}
              closeOnClick
              rtl={false}
              closeButton={false}
              pauseOnFocusLoss={false}
              pauseOnHover={false}
              draggable
              toastStyle={{
                borderRadius: '0.25rem',
                borderTop: '0.063rem solid #E4E7EC',
                borderRight: '0.063rem solid #E4E7EC',
                borderBottom: '0.063rem solid #E4E7EC'
              }}
            />
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}