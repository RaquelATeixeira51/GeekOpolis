INSERT INTO USUARIO (
  NOME, GRUPO, CPF, ATIVO, EMAIL, SENHA
) 
VALUES 
  (
    'Raquel', 'ADMIN', '54131172801', 
    TRUE, 'raquelteixeira502@gmail.com', 
    '$2a$12$GfVhD3Rd2aM2h7mto4ffJechh04SXGW3MAR.06hmGd8JGkw0EEBsS'
  );
INSERT INTO USUARIO (
  NOME, GRUPO, CPF, ATIVO, EMAIL, SENHA
) 
VALUES 
  (
    'Raquel', 'ESTOQUISTA', '98569136698', 
    TRUE, 'raquelteixeira51@gmail.com', 
    '$2a$12$GfVhD3Rd2aM2h7mto4ffJechh04SXGW3MAR.06hmGd8JGkw0EEBsS'
  );
INSERT INTO USUARIO (
  NOME, GRUPO, CPF, ATIVO, EMAIL, SENHA
) 
VALUES 
  (
    'Endrio', 'ADMIN', '68358788002', 
    TRUE, 'endriojesus76@gmail.com', 
    '$2a$12$GfVhD3Rd2aM2h7mto4ffJechh04SXGW3MAR.06hmGd8JGkw0EEBsS'
  );
INSERT INTO CATEGORIA (NOME) 
VALUES 
  ('Acessorios');
INSERT INTO CATEGORIA (NOME) 
VALUES 
  ('Roupas');
INSERT INTO CATEGORIA (NOME) 
VALUES 
  ('Canecas');
INSERT INTO PRODUTO (
  AVALIACAO, PRECO, QTD_ESTOQUE, STATUS, 
  CATEGORIA_ID, CODE, CREATED_DATE, 
  DESCRICAO, NOME, IMAGES_PATH
) 
VALUES 
  (
    2.5, 340.0, 60, TRUE, 1, 'CPFUNKONEPIECELUFFY', 
    '2023-09-21', 'De One Piece, Monkey D. Luffy, como um vinil POP estilizado da Funko! O boneco fica em pé de 9 cm e vem em uma caixa de exibição de janela. Inclui um protetor de caixa pop adequado para qualquer investimento de colecionadores.', 
    'Funko One Piece Luffy', 'https://i.ibb.co/TYYVmsP/download.jpg, https://i.ibb.co/PYrQHfz/sdf.jpg'
  ), 
  (
    4.5, 199.99, 65, TRUE, 1, 'CPFUNKOPOPPOKMONPIKACHU', 
    '2023-11-06', 'Sempre que Pikachu se depara com algo novo, ele explode com um choque de eletricidade. Se você se deparar com uma fruta enegrecida, é uma evidência de que este Pokémon confundiu a intensidade de sua carga.', 
    'Funko Pop Pokémon Pikachu', 'https://i.ibb.co/0V4z4t3/pikachu1.jpg, https://i.ibb.co/7XqZxSM/pikachu2.webp'
  ), 
  (
    4.5, 49.99, 98, TRUE, 1, 'CPKIT2PINSSTRANGERTHINGSDUSTINDEMOGORGON', 
    '2023-11-06', 'O Kit 2 Pins Stranger Things - Dustin e Demogorgon é um produto original e licenciado, exclusivo Piticas. Produção nacional, feito em Zamac e Metal, prezamos pela qualidade e diversidade. Use e Colecione, expresse todo o seu lado fã.', 
    'KIT 2 PINS STRANGER THINGS - DUSTIN DEMOGORGON', 
    'https://i.ibb.co/LP7PdYZ/kitpin1.webp, https://i.ibb.co/Q620NFS/kitpin2.webp, https://i.ibb.co/JzmzPfS/kitpin3.webp'
  ), 
  (
    5.0, 39.9, 65, TRUE, 1, 'CPCHAVEIROSTRANGERTHINGSELEVEN', 
    '2023-11-06', 'O Chaveiro Stranger Things Eleven é um produto original, licenciado e exclusivo Piticas. Produção nacional, feito em Zamac e Metal, prezamos pela qualidade e diversidade. Use e Colecione, expresse todo o seu lado fã.', 
    'CHAVEIRO STRANGER THINGS ELEVEN', 
    'https://i.ibb.co/KzG68LB/chaveiro.webp'
  ), 
  (
    3.5, 229.9, 345, TRUE, 1, 'CPBOLSAREDONDAMULHERMARAVILHA', 
    '2023-11-06', 'A Bolsa Redonda Mulher Maravilha Logo é um produto original, licenciado e exclusivo Piticas. Estampa inspirada na franquia, contendo toda autenticidade e a magia que os fãs dessa saga tanto procuram.', 
    'BOLSA REDONDA MULHER MARAVILHA', 
    'https://i.ibb.co/jWhRZtb/bolsa1.png, https://i.ibb.co/6nj6Rks/bolsa2.png'
  ), 
  (
    4.5, 139.9, 43, TRUE, 2, 'CPBONSTRANGERTHINGSHELLFIRE', 
    '2023-11-27', 'BONÉ STRANGER THINGS HELLFIRE - TAMNHO ÚNICO', 
    'BONÉ STRANGER THINGS HELLFIRE', 
    'https://i.ibb.co/njkSbN0/172905-1200-auto.png, https://i.ibb.co/MPTm8tk/172908-1200-auto.png'
  ), 
  (
    3.0, 79.99, 110, TRUE, 2, 'CPBONBORDADOMARVELEXCELSIORTAMANHONICO', 
    '2023-11-27', 'O Boné Bordado Marvel Excelsior aba reta é um produto original, licenciado e exclusivo Piticas. Para colecionar e usar, feita pelos nossos nerdsigners para vestir seu lado fã!', 
    'BONÉ BORDADO MARVEL EXCELSIOR - TAMANHO ÚNICO', 
    'https://i.ibb.co/PtZ9BwH/160761-1200-auto.jpg, https://i.ibb.co/xJX4DVk/160762-1200-auto.webp'
  ), 
  (
    2.5, 119.9, 320, TRUE, 2, 'CPCHAPEUBUCKETJUJUTSUKAISENTAMANHONICO', 
    '2023-11-27', 'O Chapeú Bucket Jujutsu é um produto original, licenciado e exclusivo GeekOpolis.', 
    'CHAPEU BUCKET JUJUTSU KAISEN - TAMANHO ÚNICO', 
    'https://i.ibb.co/tLG1mRC/169057-1200-auto.webp'
  ), 
  (
    3.5, 69.9, 120, TRUE, 2, 'CPMSCARADEDORMIRDISNEYSTITCH', 
    '2023-11-27', 'A Máscara de Dormir Disney Stitch, é um produto original, licenciado e oficial GeekOpolis. Feita pelos nossos nerdsigners para quem é fã do alienígena mais amado da Disney.', 
    'MÁSCARA DE DORMIR DISNEY STITCH', 
    'https://i.ibb.co/zrmZc7d/172683-1200-auto.png'
  ), 
  (
    2.5, 30.99, 57, TRUE, 2, 'CPMSCARAHARLEYQUINNCLSSICO', 
    '2023-11-27', 'Máscara de proteção facial confeccionada com tecido dublo', 
    'MÁSCARA HARLEY QUINN CLÁSSICO', 
    'https://i.ibb.co/w6zPb4V/160914-1200-auto.webp'
  ), 
  (
    4.0, 36.99, 231, TRUE, 1, 'CPCHAVEIROCORDOBATMANRIDDLER', 
    '2023-11-06', 'O Chaveiro Cordão Batman Riddler é um produto original e licenciado, exclusivo Piticas. Confeccionado em 100% poliéster Premium de alta qualidade com tratamento para maior resistência com impressão digital/sublimação de alta definição.', 
    'CHAVEIRO CORDÃO BATMAN RIDDLER', 
    'https://i.ibb.co/vVyJqYF/chaveirocharada1.webp, https://i.ibb.co/rdfhMgg/chaveirocharada2.webp'
  );
INSERT INTO CLIENTE (
  DATA_NASCIMENTO, CPF, EMAIL, GENERO, 
  NOME_COMPLETO, SENHA
) 
VALUES 
  (
    '2004-03-22', '47663948874', 'endriojesus76@gmail.com', 
    'MASCULINO', 'Endrio Oliveira de Jesus', 
    '$2a$10$VGv4Pr30jhht.0dZLfBUv.QKuQpxpBret2l0fxNLH19liRxdGf7oC'
  );
INSERT INTO ENDERECO (
  ATIVO, ENDERECO_FATURAMENTO, PRINCIPAL, 
  CLIENTE_ID, BAIRRO, CEP, CIDADE, COMPLEMENTO, 
  LOGRADOURO, NUMERO, UF
) 
VALUES 
  (
    TRUE, TRUE, FALSE, 1, 'Vila Silviânia', 
    '06317090', 'Carapicuíba', 'Casa 2', 
    'Avenida Prestes Maia', '188', 'SP'
  ), 
  (
    TRUE, FALSE, TRUE, 1, 'Vila Silviânia', 
    '06317090', 'Carapicuíba', 'Casa 2', 
    'Avenida Prestes Maia', '188', 'SP'
  ), 
  (
    TRUE, FALSE, FALSE, 1, 'Jurubatuba', 
    '04696000', 'São Paulo', '4º andar', 
    'Avenida Engenheiro Eusébio Stevaux', 
    '123', 'SP'
  );
