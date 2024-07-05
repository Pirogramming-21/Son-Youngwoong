import random
num = 0

def brGame(player, num):
    while True:
            if player == "computer":
                cnt = random.randint(1,3)
                #print(f"{player} - 부를 숫자의 개수: {cnt}")
                break
            else:
                try:
                    cnt = int(input("부를 숫자의 개수를 입력하세요(1, 2, 3만 입력 가능) : "))
                    if cnt in (1, 2, 3):
                        break
                    else:   
                        print("1, 2, 3 중 하나를 입력하세요")
                except ValueError:
                    print("정수를 입력하세요")
    for i in range(0, cnt):
        num += 1
        print(f"{player} : {num}")
        if num >= 31:  
            return num
    return num
            

while True:
    num = brGame("computer", num)
    if num >= 31:
        print("player win!")
        num = 0
        break
    num = brGame("player", num)
    if num >= 31:
        print("computer win!")
        num = 0
        break
