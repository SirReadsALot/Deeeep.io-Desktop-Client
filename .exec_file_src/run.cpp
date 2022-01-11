#include <iostream>
#ifdef _WIN32
#include <Windows.h>
#else
#include <unistd.h>
#endif

int main() {
    system("go run main.go");
    std::cout << "'go_run.exe' has been executed.\n";
    Sleep(5000);
}

