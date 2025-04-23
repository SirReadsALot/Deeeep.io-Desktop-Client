#include <iostream>
#ifdef _WIN32
#include <Windows.h>
#else
#include <unistd.h>
#endif

int main() {
    system("go build -o dist/Deeeep.io-Desktop-Client.exe -ldflags -H=windowsgui main.go");
    std::cout << "'go_build.exe' has been executed.\n";
    Sleep(4000);
}

