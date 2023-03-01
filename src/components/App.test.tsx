import { render, screen } from '@testing-library/react';
import App from './App';
import { WidthProvider } from './WidthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './userContext';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();


// test('renders DND FORUM', () => {
//   render(<BrowserRouter>
//     <AuthProvider>
//         <WidthProvider>
//         <QueryClientProvider client={queryClient}>
//             <App/>
//         </QueryClientProvider>
//         </WidthProvider>
//     </AuthProvider>
// </BrowserRouter>);
//   const linkElement = screen.getByText(/DND FORUM/i);
//   expect(linkElement).toBeInTheDocument();
// });



test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3)
})


// let container: any = null;
// beforeEach(() => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// test('renders with name', () => {
//     render(<Header />)
//     const test = screen.getByTitle("DND FORUM")
//     expect(test).toBeInTheDocument()
// })