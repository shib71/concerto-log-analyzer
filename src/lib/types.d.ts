export type Nominal<Type, Identifier> = Type & {
    readonly [__nominal__type]: Identifier;
};