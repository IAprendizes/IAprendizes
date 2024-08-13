vetorNome = ["Bryan Silva", "Gustavo Gomes"]
vetorEmail = ["bryan.liaris@gmail.com", "gustavo.gomes@gmail.com"]
vetorSenha = ["123456", "gu123456"]

exist = False
idUser = -1

while not exist:
    email = input("Digite o email: ")
    senha = input("Digite a senha: ")

    contador = 0

    while contador < len(vetorEmail):
        if email == vetorEmail[contador] and senha == vetorSenha[contador]:
            exist = True
            idUser = contador
            break
        contador += 1

    if not exist:
        print("Email ou senha inválidos. Tente novamente.")

if exist:
    print(f"Bem-vindo, {vetorNome[idUser]}!")

