export enum BaseAxis {
    c = 1,
    j,
    s,
    b,
    p,
    m,
    e,
    t,
}

export enum Axis {
    Constructivism = BaseAxis.c,
    JusticeSoft = BaseAxis.j,
    Progressivism = BaseAxis.s,
    Internationalism = BaseAxis.b,
    Communism = BaseAxis.p,
    Regulationnism = BaseAxis.m,
    Ecology = BaseAxis.e,
    Revolution = BaseAxis.t,
    Essentialism = -BaseAxis.c,
    JusticeHard = -BaseAxis.j,
    Conservatism = -BaseAxis.s,
    Nationalism = -BaseAxis.b,
    Capitalism = -BaseAxis.p,
    LaissezFaire = -BaseAxis.m,
    Productivism = -BaseAxis.e,
    Reformism = -BaseAxis.t,
}

export enum SpecialAxis {
    Feminism = 10,
    Religion,
    Conspiracy,
    Pragmatism,
    Monarchism,
    Veganism,
    Anarchism,
}
