#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define BOARD_SIZE 3

char board[BOARD_SIZE][BOARD_SIZE];
char currentPlayer = 'X';
bool gameActive = true;

void initializeBoard() {
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = ' ';
        }
    }
}

void printBoard() {
    printf("\n");
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            printf(" %c ", board[i][j]);
            if (j < BOARD_SIZE - 1) {
                printf("|");
            }
        }
        printf("\n");
        if (i < BOARD_SIZE - 1) {
            printf("-----------");
            printf("\n");
        }
    }
    printf("\n");
}

bool checkWin() {
    // Rows
    for (int i = 0; i < BOARD_SIZE; i++) {
        if (board[i][0] == currentPlayer && board[i][1] == currentPlayer && board[i][2] == currentPlayer) {
            return true;
        }
    }

    // Columns
    for (int j = 0; j < BOARD_SIZE; j++) {
        if (board[0][j] == currentPlayer && board[1][j] == currentPlayer && board[2][j] == currentPlayer) {
            return true;
        }
    }

    // Diagonals
    if (board[0][0] == currentPlayer && board[1][1] == currentPlayer && board[2][2] == currentPlayer) {
        return true;
    }
    if (board[0][2] == currentPlayer && board[1][1] == currentPlayer && board[2][0] == currentPlayer) {
        return true;
    }

    return false;
}

bool checkDraw() {
    for (int i = 0; i < BOARD_SIZE; i++) {
        for (int j = 0; j < BOARD_SIZE; j++) {
            if (board[i][j] == ' ') {
                return false; // Found an empty space, not a draw
            }
        }
    }
    return true; // No empty spaces, it's a draw
}

void togglePlayer() {
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
}

void makeMove(int row, int col) {
    if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE && board[row][col] == ' ') {
        board[row][col] = currentPlayer;
        if (checkWin()) {
            printf("%c wins!\n", currentPlayer);
            gameActive = false;
        } else if (checkDraw()) {
            printf("It's a draw!\n");
            gameActive = false;
        } else {
            togglePlayer();
        }
    } else {
        printf("Invalid move. Try again.\n");
    }
}

int main() {
    initializeBoard();
    printBoard();

    while (gameActive) {
        int row, col;
        printf("Player %c, enter row (0-2) and column (0-2): ", currentPlayer);
        scanf("%d %d", &row, &col);
        makeMove(row, col);
        printBoard();
    }

    return 0;
}