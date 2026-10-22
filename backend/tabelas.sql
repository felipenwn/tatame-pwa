create table praticantes (
    codigo serial not null primary key,
    nome varchar(50) not null,
    email varchar(50) not null,
    telefone varchar(14) not null,
    faixa varchar(20) not null,
    ativo boolean not null,
    data_cadastro date not null
);

create table treinos (
    codigo serial not null primary key,
    descricao varchar(80) not null,
    professor varchar(50) not null,
    dias_semana varchar(50) not null,
    horario varchar(5) not null,
    duracao_minutos integer not null,
    check (duracao_minutos > 0),
    limite_vagas integer not null,
    check (limite_vagas > 0)
);

create table presencas (
    codigo serial not null primary key,
    praticante integer not null,
    treino integer not null,
    data_presenca date not null,
    foreign key (praticante) references praticantes (codigo),
    foreign key (treino) references treinos (codigo)
);

insert into praticantes (nome, email, telefone, faixa, ativo, data_cadastro) values
('Carlos Silva', 'carlos@email.com', '(54)99999-1111', 'Branca', true, current_date),
('Marina Souza', 'marina@email.com', '(54)99999-2222', 'Azul', true, current_date),
('Pedro Lima', 'pedro@email.com', '(54)99999-3333', 'Roxa', true, current_date);

insert into treinos (descricao, professor, dias_semana, horario, duracao_minutos, limite_vagas) values
('Fundamentos de Jiu-Jitsu', 'Rafael Alves', 'Segunda, Quarta e Sexta', '19:00', 60, 20),
('Treino de competição', 'Juliana Costa', 'Terça e Quinta', '20:00', 90, 15);

insert into presencas (praticante, treino, data_presenca) values
(1, 1, current_date),
(2, 1, current_date),
(3, 2, current_date);
