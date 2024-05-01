import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header/Header'
import { AuthProvider } from '../creation/Providers/userContext';
import { WidthProvider } from '../creation/Providers/WidthContext';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

test('Wiki button routes to the wiki page', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <WidthProvider>
                        <QueryClientProvider client={queryClient}>
                            <Header/>
                        </QueryClientProvider>
                    </WidthProvider>
                </AuthProvider>
            </BrowserRouter>
        );
    const user = userEvent   
    user.click(screen.getByTestId('wiki-button'))
    const url = window.location.href
    expect(url).toContain('wiki')
})

test('Wiki button flips open to true', () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <WidthProvider>
                        <QueryClientProvider client={queryClient}>
                            <Header/>
                        </QueryClientProvider>
                    </WidthProvider>
                </AuthProvider>
            </BrowserRouter>
        );
    const user = userEvent
    const drawer = screen.getByRole('header-drawer')    
    user.click(screen.getByTestId('wiki-button'))
    expect(drawer).toHaveAttribute('my-attribute', 'open')
})

test("creat button routes to create page", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <WidthProvider>
                    <QueryClientProvider client={queryClient}>
                        <Header/>
                    </QueryClientProvider>
                </WidthProvider>
            </AuthProvider>
        </BrowserRouter>
    );
    const createButton = screen.getByTestId('create-button');
    fireEvent.click(createButton);
    var url = window.location.href
    expect(url).toContain('create/character-select');
  });

test("login button routes to login page", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <WidthProvider>
                    <QueryClientProvider client={queryClient}>
                        <Header/>
                    </QueryClientProvider>
                </WidthProvider>
            </AuthProvider>
        </BrowserRouter>
    );
    const button = screen.getByTestId('login');
    fireEvent.click(button);
    var url = window.location.href
    expect(url).toContain('login');
  });


  


