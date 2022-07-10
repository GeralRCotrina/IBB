# Generated by Django 2.1 on 2020-06-05 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion', '0011_dudas_dudasfaseloc_dudasrelalivaa'),
    ]

    operations = [
        migrations.CreateModel(
            name='AuthCliente',
            fields=[
                ('idauth_cliente', models.AutoField(primary_key=True, serialize=False)),
                ('asignacion', models.FloatField()),
                ('fecha_alta', models.DateField()),
                ('fecha_baja', models.DateField()),
                ('descripcion', models.CharField(max_length=120)),
            ],
            options={
                'db_table': 'auth_cliente',
                'managed': False,
            },
        ),
    ]