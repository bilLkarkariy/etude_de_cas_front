"""empty message

Revision ID: abf6a576d569
Revises: 
Create Date: 2021-03-07 20:50:16.755462

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'abf6a576d569'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('client', sa.Column('slug', sa.String(length=50), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('client', 'slug')
    # ### end Alembic commands ###
