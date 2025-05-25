
import RegisterForm from '@/components/forms/registerForm';
import AnimatedBox from '@/components/aniBox';
import Box from '@mui/material/Box';

export default function RegisterPage() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24 
    bg-[url('/assets/png/Blue%20and%20White%20Abstract%20Geometric%20Blank%20Page%20A4%20Landscape.png')] bg-cover bg-center bg-no-repeat">

      <Box
        className="w-full max-w-[30rem] bg-white rounded-lg shadow-md"
        sx={{
          p: 4, 
        }}
      >
        <RegisterForm />
      </Box>
    </main>
  );
}