import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header'
import { AuthProvider } from '../userContext';
import { WidthProvider } from '../WidthContext';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import userEvent from '@testing-library/user-event'


const queryClient = new QueryClient();



test('Should render the header', () => {
    render(<BrowserRouter>
            <AuthProvider>
                <WidthProvider>
                <QueryClientProvider client={queryClient}>
                    <Header/>
                </QueryClientProvider>
                </WidthProvider>
            </AuthProvider>
        </BrowserRouter>);
    const wikiButton = screen.getByTestId('wiki-button');
    const user = userEvent
    expect(wikiButton).toBeInTheDocument();
    expect(wikiButton).toHaveTextContent('Wiki')
    
    user.click(screen.getByTestId('wiki-button'))
    expect(screen.getByText(/Characters/i)).toBeInTheDocument()
})

// test("handleClickCreate navigates to create character select page", () => {
//     render(
//     <BrowserRouter>
//         <AuthProvider>
//             <WidthProvider>
//             <QueryClientProvider client={queryClient}>
//                 <Header/>
//             </QueryClientProvider>
//             </WidthProvider>
//         </AuthProvider>
//     </BrowserRouter>);
//     const createButton = screen.getByTestId('create-button');
//     // eslint-disable-next-line testing-library/no-unnecessary-act
//     act(() => {
//         fireEvent.click(createButton);
//     })

//     expect(screen.getByTestId('new-character')).toBeInTheDocument();
//   });

  


