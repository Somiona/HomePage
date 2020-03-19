import React from "react";

const withDefaultProps = <P extends object, DP extends Partial<P> = Partial<P>>(
    defaultProps: DP,
    Cmp: React.ComponentType<P>
) => {
    type RequiredProps = Omit<P, keyof DP>;
    type Props = Partial<DP> & RequiredProps;
    Cmp.defaultProps = defaultProps;
    return (Cmp as React.ComponentType<any>) as React.ComponentType<Props>;
};

export default withDefaultProps;
